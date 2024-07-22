import { CategoryItem } from "src/components/index";

const ShopByCategory = () => {

    const diamondImage = 'https://image.brilliantearth.com/cdn-cgi/image/width=297,height=344,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2Fadbea43b4bb548f9ae67e569633d3db8';
    const ringImage = 'https://dam.bluenile.com/images/public/5939/Engagement%20rings.jpeg'
    const earringImage = 'https://image.brilliantearth.com/cdn-cgi/image/width=735,height=556,quality=100,format=auto/https://cdn.builder.io/api/v1/image/assets%2F9f2a69003c86470ea05deb9ecb9887be%2F1c5d4b45587a482b80271c35731d3751'
    const necklaceImage = ''

    return (
        <>
            <div
                className="mt-16 mb-20"
            >
                <div>
                    <p className="font-lora text-3xl text-center capitalize">Shop By Category</p>
                </div>

                <div className="flex flex-row justify-center mx-auto mt-16">
                    <ul className="w-full grid grid-cols-4 list-none text-center gap-x-5 px-12">
                        <li>
                            <CategoryItem />
                        </li>

                        <li>
                            <CategoryItem />
                        </li>

                        <li>
                            <CategoryItem />
                        </li>

                        <li>
                            <CategoryItem />
                        </li>
                    </ul>

                </div>


            </div>
        </>
    )
};

export default ShopByCategory;
