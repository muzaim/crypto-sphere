"use client";

import React from 'react'
import { Banknote, Wallet, TrendingUp } from "lucide-react";

const Portfolio = () => {
    const steps = [
        {
            id: "01",
            icon: <Wallet size={64} className="text-blue-400" />,
            title: "Connect Your Wallet",
            desc: "Securely connect your crypto wallet to start managing and tracking your digital assets in real time.",
        },
        {
            id: "02",
            icon: <Banknote size={64} className="text-green-400" />,
            title: "Choose Your Assets",
            desc: "Select your favorite cryptocurrencies and build your portfolio with advanced analytics and insights.",
        },
        {
            id: "03",
            icon: <TrendingUp size={64} className="text-purple-400" />,
            title: "Start Trading Instantly",
            desc: "Buy, sell, and trade crypto effortlessly with fast execution, transparent fees, and smart portfolio tracking.",
        },
    ];

    return (
        <div className="h-full bg-[#12132a] flex items-center justify-center px-20 py-[8rem] text-white">
            <div className="max-w-3xl text-center">
                <h1 className="text-5xl font-light mb-6">Automated Portfolio Tracking</h1>
                <p className="text-gray-400 leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id consequuntur doloremque
                    aperiam sapiente velit fuga aut eius non, autem perferendis, magnam explicabo.
                </p>
                <div className="w-full flex justify-center items-center mt-20">
                    <div className="flex justify-between gap-10">
                        {steps.map((step) => (
                            <div
                                key={step.id}
                                className="w-[22rem] h-[22rem] border border-white/20 bg-white/5 backdrop-blur-md rounded-2xl p-8 text-white flex flex-col items-center justify-start text-center hover:border-blue-400 transition-all duration-300"
                            >
                                <div className="mb-6 mt-4">{step.icon}</div>
                                <h1 className="text-2xl font-semibold mb-3">{step.title}</h1>
                                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Portfolio
