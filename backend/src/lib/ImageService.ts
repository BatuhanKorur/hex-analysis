import { $ } from 'bun'
export class ImageService {
  file_path: string
  constructor(file_path: string) {
    this.file_path = file_path
  }

  // TODO: Parse and organize exiftool JSON output
  public async getImageMetadata() {
    const process = Bun.spawn(['exiftool', '-json', this.file_path!], {
      stdout: 'pipe',
      stderr: 'pipe',
    })
    const output = await new Response(process.stdout).text()
    const error = await new Response(process.stderr).text()
    console.log(output)
    console.log(error)
  }

  // TODO: Optimize magick for accurate color analysis
  public async analyzeColors() {
    try {
      // Get dominant colors (top 5)
      const colorsProcess = await $`magick ${this.file_path} -colors 5 -depth 8 -format "%c" histogram:info:`
      const colorsOutput = colorsProcess.stdout.toString()

      // Get average color
      const avgColorProcess = await $`magick ${this.file_path} -resize 1x1\! -format "%[pixel:u]" info:`
      const averageColor = avgColorProcess.stdout.toString().trim()

      // Parse dominant colors from ImageMagick output
      const dominantColors = this.parseColorHistogram(colorsOutput)

      // Generate a color palette based on dominant colors
      const colorPalette = dominantColors.map(c => c.color)

      // Check if image is grayscale
      const isGrayscaleProcess = await $`magick ${this.file_path} -colorspace HSL -channel g -separate +channel -format "%[fx:mean]" info:`
      const grayscaleValue = parseFloat(isGrayscaleProcess.stdout.toString().trim())
      const isGrayscale = grayscaleValue > 0.95 // If the mean saturation is very low, it's likely grayscale

      return {
        dominantColors,
        averageColor,
        colorPalette,
        isGrayscale,
        grayscaleProbability: grayscaleValue,
      }
    }
    catch (error) {
      console.error(`Error analyzing colors: ${error}`)
      return null
    }
  }

  // TODO: Simplify and optimize color parsing for better performance.
  private parseColorHistogram(histogramOutput: string): Array<{ color: string, percentage: number }> {
    const lines = histogramOutput.split('\n').filter(Boolean)
    const result: Array<{ color: string, percentage: number }> = []

    for (const line of lines) {
      // Parse lines like: "  8199: (  0,  0,  0) #000000 black"
      const match = line.match(/\s*(\d+):\s*\(\s*\d+,\s*\d+,\s*\d+\)\s*(#[0-9A-F]{6})/i)
      if (match) {
        const count = parseInt(match[1], 10)
        const color = match[2]

        // Calculate percentage based on total pixel count from all lines
        const totalPixels = lines.reduce((sum, l) => {
          const pixelCount = parseInt(l.match(/^\s*(\d+):/)?.[1] || '0', 10)
          return sum + pixelCount
        }, 0)

        const percentage = (count / totalPixels) * 100

        result.push({
          color,
          percentage: parseFloat(percentage.toFixed(2)),
        })
      }
    }

    return result.sort((a, b) => b.percentage - a.percentage)
  }
}
