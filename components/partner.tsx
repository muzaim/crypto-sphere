import Image from 'next/image'
import React from 'react'

const Partner = () => {
    const partners = [
        "/img/partner/1.png",
        "/img/partner/2.png",
        "/img/partner/3.png",
        "/img/partner/4.png",
        "/img/partner/5.png",
    ];

    return (
        <div className="w-full bg-[#162446] py-10 flex justify-center items-center">
            <div className="flex items-center justify-center gap-20 flex-wrap px-10">
                {partners.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt={`partner-${index + 1}`}
                        width={160}
                        height={160}
                        className="opacity-80 hover:opacity-100 transition-all duration-300"
                    />
                ))}
            </div>
        </div>
    )
}

export default Partner
