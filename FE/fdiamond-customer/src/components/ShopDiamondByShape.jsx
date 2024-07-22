import { DiamondShapeItem } from "src/components/index";

const ShopDiamondByShape = () => {

    const roundImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F55138dcf7c3047dca6b5977b9bceaf4c&w=256&q=75&dpl=v1721127952036'
    const princessImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F1d10816b762443a7a26ab81434577157&w=256&q=75&dpl=v1721127952036'
    const emeraldImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F2acc984ca1624bf4839d6f375ddc059a&w=256&q=75&dpl=v1721127952036'
    const cushionImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F7e2bc1d339c04bfb86ccce73b23dff05&w=256&q=75&dpl=v1721127952036'
    const marquiseImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252Fdf8bb60052394b09aaaebfe5ac0cb15c&w=256&q=75&dpl=v1721127952036'
    const radiantImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252Fbe5ac40634a44cafb9d284665c460ae3&w=256&q=75&dpl=v1721127952036'
    const ovalImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F22c1825bc7cd4236acfc621064075d10&w=256&q=75&dpl=v1721127952036'
    const pearImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252F7622eace49424c43aba2b2036a6061fb&w=256&q=75&dpl=v1721127952036'
    const heartImg = 'https://www.brilliantearth.com/_next/image/?url=https%3A%2F%2Fcdn.builder.io%2Fapi%2Fv1%2Fimage%2Fassets%252F9f2a69003c86470ea05deb9ecb9887be%252Fa4fe27053d254a218e0a7f3c15526a0a&w=256&q=75&dpl=v1721127952036'



    return (
        <>
            <div
                className="mt-16 mb-20"
            >
                <div>
                    <p className="font-lora text-3xl text-center capitalize">Shop Diamonds by Shape</p>
                </div>

                <div className="flex flex-row justify-center w-[83%] mx-auto mt-16">
                    <ul className="w-full flex flex-row justify-between list-none text-center">
                        <li>
                            <DiamondShapeItem type={'Round'} imageUrl={roundImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Oval'} imageUrl={ovalImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Emerald'} imageUrl={emeraldImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Cushion'} imageUrl={cushionImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Pear'} imageUrl={pearImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Radiant'} imageUrl={radiantImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Princess'} imageUrl={princessImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Marquise'} imageUrl={marquiseImg} />
                        </li>

                        <li>
                            <DiamondShapeItem type={'Heart'} imageUrl={heartImg} />
                        </li>


                    </ul>
                </div>


            </div>
        </>
    )
};

export default ShopDiamondByShape;
