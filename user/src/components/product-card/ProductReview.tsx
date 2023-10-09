import { ReactElement } from 'react'
import { Rating } from 'react-simple-star-rating'


type Props = {
    img: string,
    name: string,
    date: string,
    rating?: number,
    desc: string
}

export const ProductReview = (props: Props): ReactElement => {

    return (
        <div className='flex flex-col gap-4 border-b mt-10 pb-5'>
            <div className='flex items-center gap-5'>

                {/* IMG */}
                <div className='w-10 h-10 rounded-full'>
                    <img src={props.img} alt={props.name} className='w-full h-full rounded-full object-cover' />
                </div>

                {/* NAME, RATING AND DATE */}
                <div className='flex flex-col'>
                    <p className={`${props.rating ? "" : "flex flex-col"}`}><b>{props.name}</b> <span>{props.date}</span></p>
                    {
                        props.rating
                            ? <Rating
                                initialValue={props.rating}
                                onClick={function noRefCheck() { }}
                                readonly
                                className='star-svg'
                                size={20}
                            />
                            : null
                    }
                </div>
            </div>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nobis repellat porro corporis architecto distinctio voluptates iste eaque doloremque aliquam sapiente vitae alias quam esse dolorum ducimus tenetur quo. Enim?
            </div>
        </div>
    )
}
