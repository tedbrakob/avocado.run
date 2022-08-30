import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Props = {
  data,
  columns,
}

export default function Table(props: Props) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="border-solid border-dark border w-full bg-white">
      <thead className="bg-dark-accent text-light border-dark border-solid border">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="p-2 px-3">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="odd:bg-white even:bg-light">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}