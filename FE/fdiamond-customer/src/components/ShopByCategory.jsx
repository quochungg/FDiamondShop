import { CategoryItem } from "src/components/index";

const ShopByCategory = () => {

    const diamondImage = 'https://image.brilliantearth.com/cdn-cgi/image/width=297,height=344,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fadbea43b4bb548f9ae67e569633d3db8';
    const ringImage = 'https://dam.bluenile.com/images/public/5939/Engagement%20rings.jpeg'
    const earringImage = 'https://image.brilliantearth.com/cdn-cgi/image/width=735,height=556,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F1c5d4b45587a482b80271c35731d3751'
    const necklaceImage = 'https://image.brilliantearth.com/media/product_images/AG/BE4LD899-S_040.jpg'

    return (
        <>
            <div
                className="mt-20 mb-20"
            >
                <div>
                    <p className="font-lora text-3xl text-start px-12 capitalize tracking-wide">Shop By Category</p>
                </div>

                <div className="flex flex-row justify-center mx-auto mt-10">
                    <ul className="w-full grid grid-cols-4 list-none text-center gap-x-5 px-12">
                        <li>
                            <CategoryItem type='Natural Diamonds' imageUrl={diamondImage} linkTo={'/product/diamond'} />
                        </li>

                        <li>
                            <CategoryItem type='Engagement Rings' imageUrl={ringImage} linkTo={'/product/engagement ring'} />
                        </li>

                        <li>
                            <CategoryItem type='Earrings' imageUrl={earringImage} linkTo={'/product/earring'} />
                        </li>

                        <li>
                            <CategoryItem type='Necklaces' imageUrl={necklaceImage} linkTo={'/product/necklace'} />
                        </li>
                    </ul>

                </div>


            </div>
        </>
    )
};

export default ShopByCategory;
