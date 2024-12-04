import { useState } from 'react';
import { deleteCanvas, getCanvases } from '../api/canvas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCanvas } from '../api/canvas';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import CategoryFilter from '../components/CategoryFilter';
//import axios from 'axios';
function Home() {
  const [filter, setFilter] = useState({
    searchText: '', // 초기값을 빈 문자열로 변경
    category: undefined,
  });

  const handleFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const [isGridVeiw, setIsGridView] = useState(true);
  const queryClient = useQueryClient();
  //1] 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      console.log('fetching Data');
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      });
    },
    // initialData: [],
    staleTime: 1000 * 60 * 5, ///5분동안 데이터가 신선함(fresh) 상태로 유지
    refetchOnWindowFocus: false,
  });
  //2] 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });
  //3] 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = async id => {
    if (confirm('삭제 하시겠습니까?') === false) {
      return;
    }
    //delete 로직 수행
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>

        <ViewToggle isGridVeiw={isGridVeiw} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          searchText={filter.searchText}
          isGridVeiw={isGridVeiw}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}
export default Home;
