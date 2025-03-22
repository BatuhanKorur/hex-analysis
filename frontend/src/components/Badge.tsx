import {PropsWithChildren} from "react";

export function Badge(props: PropsWithChildren){
  return (
      <div className="bg-zinc-800 px-6 py-2 rounded-full text-sm" {...props}>
        { props.children }
      </div>
  )
}
