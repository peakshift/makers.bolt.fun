import Card from 'src/Components/Card/Card';
import Skeleton from 'react-loading-skeleton';

export default function BasicProfileInfoTabSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="col-span-2 flex flex-col gap-24">
                <Card className="md:col-span-2" defaultPadding={false}>
                    <div className="bg-gray-100 relative h-[160px] rounded-t-16">
                        <div className="absolute left-24 bottom-0 translate-y-1/2">
                            <div className="w-[120px] aspect-square rounded-full bg-gray-50 border border-gray-200"></div>
                        </div>
                    </div>

                    <div className="p-16 md:p-24 mt-64">

                        <p className="text-body2 font-bold"><Skeleton width="12ch" /></p>
                        <p className="text-body4 text-gray-600 mt-8">
                            <Skeleton width="50%" />
                        </p>
                        <div className="py-[250px]"></div>
                    </div>
                </Card>
            </div>
            <div className="">

            </div>
        </div>
    )
}
