"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../common/Alert";

const TimeSelect = ({ name, value, onChange, label }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
    >
      {Array.from({ length: 24 }, (_, i) => (
        <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
          {`${i.toString().padStart(2, '0')}:00`}
        </option>
      ))}
    </select>
  </div>
);

export default function RoomUpdate() {
  const [formData, setFormData] = useState({
    place: '',
    people: '',
    alone: false,
    startDate:'',
    endDate: '',
    startTime: '00:00',
    endTime: '00:00',
    account: ''
  });

  const route = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  
  const handleChange = (event:any) => {
    const { name, value, type } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'radio' ? value === 'true' : value
    }));
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(formData);
    // 데이터 보내기 함수 적으면 됨.
  };

  const goBack = () => {
    route.back()
  }

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0');
      options.push(`${hour}:00`);
    }
    return options;
  }

  const onCreate = () => {
    setIsOpen(true);
  }

  return (
      <div className="max-w-lg mx-auto bg-green-50 my-8 rounded-lg p-6">
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">공간 이름</label>
          <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} placeholder="공간의 이름을 적어주세요" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <div className="mb-4">
          <label htmlFor="people" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">정원 수</label>
          <input type="number" id="people" name="people" value={formData.people} onChange={handleChange} className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">공유 오피스인가요?</label>
          <div className="flex items-center mb-2">
            <input type="radio" id="aloneYes" name="alone" value="true" checked={formData.alone === true} onChange={handleChange} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="aloneYes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">네</label>
          </div>
          <div className="flex items-center">
            <input type="radio" id="aloneNo" name="alone" value="false" checked={formData.alone === false} onChange={handleChange} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="aloneNo" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">아니오</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이용가능 시간</label>
          <div className="flex items-center space-x-4">
            <TimeSelect
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              label="시작 시간"
            />
            <TimeSelect
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              label="종료 시간"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이용가능 시간</label>
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">시작 시간</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">종료 시간</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="account" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이용 금액</label>
          <input type="text" id="account" name="account" value={formData.account} onChange={handleChange} placeholder="이용금액을 적어주세요" className="bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5" />
        </div>

        <button type="submit" onClick={onCreate} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">등록하기</button>
        <button type="button" onClick={goBack} className="text-gray-900 bg-green-50 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-2 border-green-600 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">뒤로가기</button>
      </form>
      <Alert message={'등록되었습니다.'} isOpen={isOpen} onClose={() => {setIsOpen(false)}} />
    </div>
  )
}