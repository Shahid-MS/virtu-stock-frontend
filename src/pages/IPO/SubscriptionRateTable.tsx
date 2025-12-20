import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { SubscriptionProps } from "../../Interface/IPO";

export default function SubscriptionRateTable({
  subscription,
}: SubscriptionProps) {
  return (
    <div className="overflow-hidden  bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {Object.entries(subscription).map(([name, value]) => (
              <TableRow key={name}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {value}x
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
