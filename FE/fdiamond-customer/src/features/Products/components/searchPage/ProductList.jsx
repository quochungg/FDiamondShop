//Thay doi the a thanh the link
//truncate?
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'


const ProductList = ({ productList, category }) => {
    console.log('ProductList renders')

    const hover = 'cursor-pointer hover:border-blue-950  hover:border-[1px] border-[1px]'
    // flex items-center justify-center mt-10
    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div className="grid grid-cols-4 gap-x-3 gap-y-5">
                    {productList.map(product => (
                        <div key={product.productId} className={`w-[350px] h-[400px] ${hover} `}>
                            <Link to={`/product/product-details /${product.productId}`} className="flex flex-col justify-start h-full w-full">
                                <div className="">
                                    <img
                                        className="object-cover"
                                        src={product.productImages[0].imageUrl}
                                    />
                                </div>

                                <div className="flex flex-col justify-start mt-3">
                                    <div className='px-5 flex-1'>
                                        <LinesEllipsis
                                            className="font-lora text-[16px] font-[600]"
                                            text={product.productName}
                                            maxLine='2'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='letters'
                                        />
                                    </div>
                                    <p className="p-5 flex-1 content-center font-gantari text-2sm leading-5">
                                        ${product.basePrice} {category === 'engagement ring' && '(Setting Price)'}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}






                </div>
            </div>
        </>
    );
};

export default ProductList;



{/* 
                    <div className={`w-[350px] h-auto ${hover}`}>
                        <Link to='https://www.google.com/' className="">
                            <div className="mb-6">
                                <img
                                    // className="w-full h-full"
                                    className="object-cover"
                                    src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
                                />
                            </div>
                            <div className="px-4">
                                <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
                                    Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
                                    tw.)
                                </p>
                                <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
                            </div>
                        </Link>
                    </div>

                    <div className={`w-[350px] h-auto ${hover}`}>
                        <a className="">
                            <div className="mb-6">
                                <img
                                    // className="w-full h-full"
                                    className="object-cover"
                                    src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
                                />
                            </div>
                            <div className="px-4">
                                <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
                                    Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
                                    tw.)
                                </p>
                                <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
                            </div>
                        </a>
                    </div>

                    <div className={`w-[350px] h-auto ${hover}`}>
                        <a className="">
                            <div className="mb-6">
                                <img
                                    // className="w-full h-full"
                                    className="object-cover"
                                    src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
                                />
                            </div>
                            <div className="px-4">
                                <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
                                    Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
                                    tw.)
                                </p>
                                <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
                            </div>
                        </a>
                    </div>

                    <div className={`w-[350px] h-auto ${hover}`}>
                        <a className="">
                            <div className="mb-6">
                                <img
                                    // className="w-full h-full"
                                    className="object-cover"
                                    src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
                                />
                            </div>
                            <div className="px-4">
                                <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
                                    dsfsdfsdfsfsdfsd
                                </p>
                                <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
                            </div>
                        </a>
                    </div> */}

// <div className={`w-[350px] h-auto ${hover}`}>
// <a className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             dsfsdfsdfsfsdfsd
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// {/* DIAMOND */ }
// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>

// <div className={`w-[350px] h-auto ${hover}`}>
// <a href="google.com" className="">
//     <div className="mb-6">
//         <img
//             // className="w-full h-full"
//             className="object-cover"
//             // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//             src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//         />
//     </div>
//     <div className="px-4">
//         <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//             Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//             tw.)
//         </p>
//         <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//     </div>
// </a>
// </div>


// <div className={`w-[350px] h-auto ${hover}`}>
//                         <a href="google.com" className="">
//                             <div className="mb-6">
//                                 <img
//                                     // className="w-full h-full"
//                                     className="object-cover"
//                                     // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//                                     src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//                                 />
//                             </div>
//                             <div className="px-4">
//                                 <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//                                     Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//                                     tw.)
//                                 </p>
//                                 <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//                             </div>
//                         </a>
//                     </div>

//                     <div className={`w-[350px] h-auto ${hover}`}>
//                         <a href="google.com" className="">
//                             <div className="mb-6">
//                                 <img
//                                     // className="w-full h-full"
//                                     className="object-cover"
//                                     // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//                                     src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//                                 />
//                             </div>
//                             <div className="px-4">
//                                 <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//                                     Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//                                     tw.)
//                                 </p>
//                                 <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//                             </div>
//                         </a>
//                     </div>

//                     <div className={`w-[350px] h-auto ${hover}`}>
//                         <a href="google.com" className="">
//                             <div className="mb-6">
//                                 <img
//                                     // className="w-full h-full"
//                                     className="object-cover"
//                                     // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//                                     src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//                                 />
//                             </div>
//                             <div className="px-4">
//                                 <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//                                     Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//                                     tw.)
//                                 </p>
//                                 <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//                             </div>
//                         </a>
//                     </div>

//                     <div className={`w-[350px] h-auto ${hover}`}>
//                         <a href="google.com" className="">
//                             <div className="mb-6">
//                                 <img
//                                     // className="w-full h-full"
//                                     className="object-cover"
//                                     // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//                                     src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//                                 />
//                             </div>
//                             <div className="px-4">
//                                 <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//                                     Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//                                     tw.)
//                                 </p>
//                                 <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//                             </div>
//                         </a>
//                     </div>

//                     <div className={`w-[350px] h-auto ${hover}`}>
//                         <a href="google.com" className="">
//                             <div className="mb-6">
//                                 <img
//                                     // className="w-full h-full"
//                                     className="object-cover"
//                                     // src="https://ion.bluenile.com/sets/Jewelry-bn/194677/RND/Images/gallery.jpg"
//                                     src='https://ion.bluenile.com//sgmdirect/photoID/33168673/Diamond/20372353/nl/Diamond-oval-1-Carat_4_first_.jpg'
//                                 />
//                             </div>
//                             <div className="px-4">
//                                 <p className="font-lora font-[600] text-ellipsis overflow-hidden leading-6">
//                                     Twisted Halo Diamond Engagement Ring in 14k White Gold (1/3 ct.
//                                     tw.)
//                                 </p>
//                                 <p className="font-gantari text-2sm leading-5 my-3">$1,740</p>
//                             </div>
//                         </a>
//                     </div>