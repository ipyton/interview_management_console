import React from 'react';
import { Calendar, Video, MessageCircle, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Custom Card Component
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
    </div>
);




const HeroSection = () => (
    <div className="relative min-h-[80vh] flex items-center">
        <div
            className="absolute inset-0 bg-black/50 z-10"
            style={{
                backgroundImage: `url(/images/ladder-of-success.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay'
            }}
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                用数据驱动您的面试准备，轻松掌握面试趋势！            </h1>
            <p className="text-xl text-gray-100 mb-12 drop-shadow">
                这款应用程序是一个全方位的面试准备平台，旨在帮助求职者高效、智能地准备面试，从而提升面试通过率。无论你是刚刚步入职场的新手，还是想要跳槽的资深候选人，都可以找到自己想要的答案。
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium 
        shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 
        inline-flex items-center gap-2">
                小程序二维码 <ArrowRight className="h-5 w-5" />
            </button>
        </div>
    </div>
);

const FeatureCard = ({ Icon, title, description }) => (
    <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
        <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
                <Icon className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </Card>
);

const features = [
    {
        Icon: Calendar,
        title: "收藏面试题",
        description: "用户可以将感兴趣的面试题收藏到个人账号中，便于后续查看和复习。收藏的面试题可以根据不同分类（如编程、算法、系统设计等）进行管理和筛选。"
    },
    {
        Icon: Video,
        title: "听面试题",
        description: "提供音频或视频形式的面试题解答，帮助用户更好地理解面试题及解答思路。"
    },
    {
        Icon: MessageCircle,
        title: "搜索面试题",
        description: "提供模糊搜索功能，帮助用户找到与特定职位、行业相关的面试问题。"
    },
    {
        Icon: FileText,
        title: "查看热门面试题",
        description: "显示当前最受欢迎的面试题，基于用户收藏、搜索和回答情况进行排名。用户可以查看这些面试题的详细描述和相关解答，帮助自己高效准备面试。"
    }
];

const Introduction = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/manage');
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection />

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>

            {/* Social Proof Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Trusted by Leading Companies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                        {[1, 2, 3, 4].map((i) => (
                            <img
                                key={i}
                                src={`/api/placeholder/200/100`}
                                alt={`Company ${i}`}
                                className="h-12 object-contain"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        管理员？
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        进入管理后台，管理面试题库，查看用户反馈，管理用户账号等。
                    </p>
                    <button onClick={handleClick} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium 
            shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        管理后台
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Introduction;