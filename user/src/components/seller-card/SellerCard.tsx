import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'

type Props = {
    id: number,
    img: string,
    rating: number,
    name: string
}

export const SellerCard = (props: Props): ReactElement => {
    return (
        <Link to={`/seller/details/${props.id}`}>
            <div className='flex flex-col gap-3'>
                <div className='w-full h-72 border'>
                    <img src={props.img} alt={props.name} className='w-full h-full object-cover' />
                </div>
                <div>
                    <Rating
                        initialValue={props.rating}
                        onClick={function noRefCheck() { }}
                        readonly
                        className='star-svg'
                        size={20}
                    />
                </div>
                <p className='line-clamp-1 font-medium'>{props.name}</p>
            </div>
        </Link>
    )
}