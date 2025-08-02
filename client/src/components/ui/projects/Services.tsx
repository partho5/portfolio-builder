
import './Services.css';
import { Menu, X, Code, Database, Globe, Smartphone, Settings, Zap } from 'lucide-react';

const services = [
    { icon: <Globe className="w-4 h-4" />, title: 'Web Development' },
    { icon: <Smartphone className="w-4 h-4" />, title: 'Mobile Apps' },
    { icon: <Database className="w-4 h-4" />, title: 'Database Design' },
    { icon: <Settings className="w-4 h-4" />, title: 'API Integration' },
    { icon: <Zap className="w-4 h-4" />, title: 'Automation' },
    { icon: <Code className="w-4 h-4" />, title: 'Custom Solutions' }
  ];

const ServiceList = () => {
    return (
        <>
            <ul className="space-y-2 mt-4">
                {services.map((service, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm py-1 px-2 hover:bg-white rounded transition-colors">
                    {service.icon}
                    <span>{service.title}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ServiceList;
