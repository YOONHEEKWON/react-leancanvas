import CanvasItem from './CanvasItem';

export default function CanvasList({
  filteredData,
  searchText,
  isGridVeiw,
  onDeleteItem,
}) {
  if (filteredData.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">
          {searchText ? '검색 결과가 없습니다.' : '목록이 없습니다'}
        </p>
      </div>
    );
  }
  return (
    <div
      className={`grid gap-6 ${isGridVeiw ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}  `}
    >
      {filteredData.map(item => (
        <CanvasItem
          onDelete={e => {
            e.preventDefault();
            onDeleteItem(item.id);
          }}
          title={item.title}
          lastModified={item.lastModified}
          category={item.category}
          key={item.id}
          id={item.id}
        />
      ))}
    </div>
  );
}
