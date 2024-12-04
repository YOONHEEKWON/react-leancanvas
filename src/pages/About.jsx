import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Button from '../components/Button';
export default function About() {
  const quertClient = useQueryClient();
  //useQuery는 서버에서 데이터를 가져오고, 그 데이터를 캐시하여 컴포넌트에서 쉽게 사용할 수 있도록 도와주는 훅입니다.
  // useMutation  데이터를 생성,수정,삭제하는 등의 변이 작업을 관리하기 위한 훅입니다.
  const { data, isLoading, error } = useQuery({
    queryKey: ['canvases'], //키 정의
    queryFn: () =>
      axios.get('http://localhost:8000/canvases/').then(res => res.data), //데이터 조회  then 데이터 반환
    initialData: [], //초기값 설정해줘야함
  });

  const { mutate: createNewCanvas, isLoading: canvasLoading } = useMutation({
    mutationFn: canvases =>
      axios.post('http://localhost:8000/canvases/', canvases),
    onSuccess: () => {
      quertClient.invalidateQueries(['canvases']);
    },
  });
  const handleCreate = () => {
    createNewCanvas({ title: 'new heekown!' });
  };
  return (
    <div>
      <h2 className="text-3xl">React Query(useQuery)</h2>
      {isLoading && <p>....loading...</p>}
      {error && <p>{error.message}</p>}
      {data.map(item => (
        <li key={item.id}>{item.title}</li> //data 초기값이 없어서 에러가 남 초기값을 빈배열로 설정해줘야함
      ))}
      <h2 className="text-3xl">useMutation</h2>
      {canvasLoading && <p>...로딩중</p>}
      <Button onClick={handleCreate}>등록하기</Button>
    </div>
  );
}
