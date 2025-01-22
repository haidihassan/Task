import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

type Tab = {
    value: string;
    label: string;
};

interface TabsComponentProps {
    tabs: Tab[];
    onTabSelect: (value: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({ tabs, onTabSelect }) => {
    return (
        <Tabs
            defaultValue={tabs[0].value}
            className="w-[314px] border border-gray-300 mx-auto rounded-md shadow-md"
            onValueChange={onTabSelect} // Call onTabSelect when the value changes
        >
            <TabsList className="flex border-b border-gray-300">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="py-2 px-4 text-gray-700 transition-colors duration-200 data-[state=active]:bg-[#ebe3f1] data-[state=active]:text-black"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default TabsComponent;
