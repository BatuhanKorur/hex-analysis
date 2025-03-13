import { $ } from 'bun'
import { ColorAnalysisItem, ImageMetadataResponse } from '@hex-analysis/shared'
export class ImageService {
  file_path: string
  constructor(file_path: string) {
    this.file_path = file_path
  }

  // TODO: Parse and organize exiftool JSON output
  public async getImageMetadata() {
    try {
      const process = await $`exiftool -j ${this.file_path}`.text()
      const metadata = JSON.parse(process)[0]
      return {
        image_width: metadata.ImageWidth,
        image_height: metadata.ImageHeight,
        megapixels: metadata.Megapixels,
      } as ImageMetadataResponse
    }
    catch (error) {
      console.error(`Error getting image metadata: ${error}`)
      return null
    }
  }

  // TODO: Optimize magick for accurate color analysis
  public async analyzeColors() {
    try {
      const colorsProcess = await $`magick ${this.file_path} -resize 50x50 -colors 10 -depth 8 +dither -format "%c" histogram:info: | awk '{count=$1; hex=$3; total=2500; printf "%s %.2f\n", hex, (count/total*100)}'`.text()
      return colorsProcess
        .split('\n')
        .map((line) => {
          const [color, percentage] = line.split(' ')
          if (Number(percentage) > 0) {
            return { color, percentage: parseFloat(percentage) } as ColorAnalysisItem
          }
        })
        .filter((item): item is ColorAnalysisItem => item !== null && item !== undefined)
        .sort((a, b) => (b.percentage - a.percentage))
    }
    catch (error) {
      console.error(`Error analyzing colors: ${error}`)
      return null
    }
  }
}
