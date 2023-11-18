import {ReactElement} from 'react'
import { Link } from 'react-router-dom'

type Props = {
    title: string,
    type: string,
    link: {label: string, href: string},
    img: string
    titlePosition?: "top" | "bottom"
    wrapperClassName?: string,
    imgClassName?: string,
    className?: string,
}

export const ShowCaseCard = ({title, type, link, img, titlePosition, className, imgClassName}: Props): ReactElement => {
  return (
    <div className={`bg-card-bg p-4 flex justify-between gap-10 ${titlePosition === "top" ? " items-start" : "items-end"} ${className}`}>
      <div>
        <p className='text-2xl font-bold'>{title}</p>
        <Link className='border-b-2 border-black font-medium' to={`catalog/${type}`} state={{category_id : 1}}>{link.label}</Link>
      </div>
      <div className=''>
        <div className={imgClassName}>
          <img className='object-cover h-full' src={img} alt={title} />
        </div>
      </div>
    </div>
  )
}
