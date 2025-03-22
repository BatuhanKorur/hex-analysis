export function Description({ title, value }: { title: string, value: string }) {
  return (
      <div className="flex items-center justify-between py-2">
        <div className="flex flex-col items-start">
          <h3 className="text-sm text-zinc-400/80">{ title }</h3>
          <p className="text-base font-medium text-zinc-300">{ value }</p>
        </div>
      </div>
  )
}
