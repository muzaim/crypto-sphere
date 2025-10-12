import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className="h-screen bg-[#12132a] flex items-center justify-between px-20 text-white">
            {/* LEFT */}
            <div className="flex-1 relative">
                {/* 🔵 Glow biru */}
                <div className="absolute top-0 left-20 w-[20rem] h-[20rem] bg-blue-600 rounded-full blur-3xl opacity-40"></div>

                {/* 🩵 Arrow di kanan teks “Live and” */}
                <Image
                    src="/img/acc/Arrow_03.png"
                    alt="arrow"
                    width={200}
                    height={200}
                    className="absolute top-[-8rem] right-[10rem]"
                />

                {/* 🧩 Konten teks */}
                <h1 className="text-[8rem] font-thin mb-6 leading-tight tracking-wider relative z-10">
                    <span className="block">Live and</span>
                    <span className="block">on-demand</span>
                    <span className="block">trading</span>
                </h1>

                <p className="text-lg text-gray-500 mb-8 w-full pr-[3rem] relative z-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure debitis
                    tenetur ipsam saepe illo laborum soluta, sed nostrum optio ipsum? Dolorum
                    perferendis ex quidem repellat perspiciatis?
                </p>

                <button className="bg-transparent border-2 border-white px-10 py-5 font-semibold transition ease-in-out duration-300 relative z-10">
                    Explore Now
                </button>
            </div>




            {/* RIGHT */}
            <div className="flex-1 relative flex justify-center items-end h-full">
                {/* 🖐 Gambar utama */}
                <Image
                    src="/img/Wood-Hand.png"
                    width={640}
                    height={640}
                    alt="Hero image"
                    className="object-contain relative z-10"
                />

                {/* ✨ Bintang-bintang mengelilingi */}
                <Image
                    src="/img/acc/Star_4.png"
                    alt="star"
                    width={80}
                    height={80}
                    className="absolute z-20 bottom-[20%] right-[8%] animate-twinkle"
                />
                <Image
                    src="/img/acc/Star_5.png"
                    alt="star"
                    width={60}
                    height={60}
                    className="absolute top-[20%] right-[35%] animate-twinkle delay-1000"
                />
                <Image
                    src="/img/acc/Star_6.png"
                    alt="star"
                    width={40}
                    height={40}
                    className="absolute bottom-[30%] left-[10%] animate-twinkle delay-700"
                />
            </div>


        </div>
    )
}

export default Hero
