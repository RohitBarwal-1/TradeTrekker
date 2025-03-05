import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Losers {
    company_name: string;
    logo_base64: string | null;
    stock_price: string;
    percentage_change: string;
}

export default function TopLosers() {
    const [losers, setLosers] = useState<Losers[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/top_losers")
            .then((res) => res.json())
            .then((data) => {
                setLosers(data.top_losers);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 max-h-[500px]">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Top Losers
                </h3>
            </div>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">Loading...</p>
            ) : (
                <div className="max-w-full overflow-y-auto max-h-[750px] scrollbar-hide custom-scrollbar">
                    <Table>
                        <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                            <TableRow>
                                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Name
                                </TableCell>
                                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Price
                                </TableCell>
                                <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Change
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-gray-800 ">
                            {losers.map((stock, index) => (
                                <TableRow key={index}>
                                    <TableCell className="py-3 flex items-center gap-3">
                                        {stock.logo_base64 ? (
                                            <img
                                                src={`data:image/png;base64,${stock.logo_base64}`}
                                                className="h-10 w-10 rounded-full"
                                                alt={stock.company_name}
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                    {stock.company_name[0]}
                                                </span>
                                            </div>
                                        )}
                                        <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                            {stock.company_name}
                                        </p>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        ${stock.stock_price}
                                    </TableCell>
                                    <TableCell className="py-3 text-theme-sm">
                                        <Badge size="sm" color={"error"}>
                                            {stock.percentage_change}%
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

