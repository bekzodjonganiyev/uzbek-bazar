import {ReactElement} from 'react'

type Props = {
    title: string,
    link: {label: string, href: string},
    img: string
    titlePosition?: "top" | "bottom"
    className?: string 
}

export const ShowCaseCard = ({title, link, img, titlePosition, className}: Props): ReactElement => {
  return (
    <div className={`bg-footer p-4 flex ${titlePosition === "top" ? " items-start" : "items-end"} ${className}`}>
      <div>
        <p>{title}</p>
        <a href={link.href}>{link.label}</a>
      </div>
      <div className='flex-1'>
        <div>
          <img src={img} alt={title} />
        </div>
      </div>
    </div>
  )
}
