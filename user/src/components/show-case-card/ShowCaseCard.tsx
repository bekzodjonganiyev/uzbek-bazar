import {ReactElement} from 'react'

type Props = {
    title: string,
    link: {label: string, href: string},
    img: string
    titlePosition?: "top" | "bottom"
    wrapperClassName?: string,
    imgClassName?: string,
    className?: string,
}

export const ShowCaseCard = ({title, link, img, titlePosition, className, imgClassName}: Props): ReactElement => {
  return (
    <div className={`bg-card-bg p-4 flex justify-between gap-10 ${titlePosition === "top" ? " items-start" : "items-end"} ${className}`}>
      <div>
        <p className='text-2xl font-bold'>{title}</p>
        <a className='border-b-2 border-black font-medium' href={link.href}>{link.label}</a>
      </div>
      <div className=''>
        <div className={imgClassName}>
          <img className='object-cover' src={img} alt={title} />
        </div>
      </div>
    </div>
  )
}
