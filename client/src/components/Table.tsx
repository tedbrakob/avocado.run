import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Props = {
  data,
  columns,
  header,
  footer?,
  columnOrder?,
  noWrap?: boolean,
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Table(props: Props) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    state: {
      columnOrder: props.columnOrder ?? [],
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div
        className="w-full text-center bg-dark font-bold text-light p-1 px-4 rounded-t-xl"
      >
        {props.header}
      </div>
      <div 
        className={
          classNames(
            props.noWrap ? "whitespace-nowrap" : "",
            'w-full overflow-scroll overflow-x-auto hide-scrollbars'
          )}
        >
        <table className="border-solid border-dark border bg-white w-full">
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
              <tr key={row.id} className="even:bg-white odd:bg-light">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className=" w-full text-center bg-dark font-bold text-light p-1 rounded-b-xl"
      >
        {props.footer}
      </div>
    </div>
  );
}