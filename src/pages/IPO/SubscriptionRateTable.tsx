import { useParams } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";

import ipos from "../../Data/ipos";

export default function SubscriptionRateTable() {
  const { id } = useParams();
  const ipo = ipos.find((item) => item.id === id);
  return (
    <div className="overflow-hidden  bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {ipo?.subsrciption.map((subs) => (
              <TableRow key={subs.name}>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {subs.name}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {subs.value}x
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
