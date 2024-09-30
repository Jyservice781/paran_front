"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeartCheckbox from "./HeartCheckBox";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getError, getIsLoading, saveBooks, saveError, saveLoading } from "@/lib/features/group/book.Slice";
import { findBookList } from "@/app/service/group/book.service";
import { getFiles, saveFiles } from "@/lib/features/file.Slice"; // 추가: 파일을 저장하는 액션
import { selectFileList } from "@/app/service/File/file.service";
import { FileModel, FileType } from "@/app/model/file.model";

interface BookRowProps {
  active: boolean;
  onSelect: () => void;
}

const BookRow: React.FC<BookRowProps> = ({ active, onSelect }) => {
  const [isActive, setIsActive] = useState<boolean>(active);
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => getBooks(state));
  const loading = useSelector((state: RootState) => getIsLoading(state));
  const error = useSelector((state: RootState) => getError(state));
  const files = useSelector((state: RootState) => getFiles(state));

  const page = 5; // 임의로 넣어둠
  const size = 5; // 임의로 넣어둠

  // 책 리스트와 각 책에 연결된 파일을 로드하는 함수
  const loadBookFiles = (books: any[]) => {
    const bookIds = books.map(book => book.id);
    selectFileList(bookIds, FileType.BOOK)
      .then(files => 
        dispatch(saveFiles(files)))
      .catch(error => {
        console.error('Error fetching files:', error);
        return []; // 에러 발생 시 빈 배열 반환
      })
  };

  useEffect(() => {
    setIsActive(active);
    dispatch(saveLoading(true));

    // 책 목록을 불러온 후, 각 책의 파일을 불러옴
    findBookList(page, size)
      .then(result => {
        if (result && Array.isArray(result)) {
          dispatch(saveBooks(result));
          return loadBookFiles(result); // 책 목록에 맞는 파일 로드
        } else {
          dispatch(saveError("책 목록을 불러오는 중 오류가 발생했습니다."));
        }
      })
      .catch((error) => {
        dispatch(saveError((error as Error).message || "책 목록을 불러오는 중 오류가 발생했습니다."));
      })
      .finally(() => {
        dispatch(saveLoading(false)); // 항상 로딩 종료
      });
  }, [active, dispatch]);

  const handleLikeChange = (active: boolean) => {
    console.log("좋아요 상태:", active);
    // 여기에서 필요한 로직을 수행 (예: API 호출)
  };

  const handleClick = (): void => {
    onSelect();
  };

  // 특정 책에 맞는 파일을 찾는 함수
  const getBookImage = (bookId: number) => {
    const bookFile = files.bookFiles.find(file => file.refId === bookId);
    return bookFile ? `http://localhost:8000/api/files/one?path=${bookFile.path}` : "https://picsum.photos/400/380"; // 기본 이미지 제공
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {books.map((book) => (
        <div key={book.id} className="relative max-w-sm">
          <form className="absolute top-2 w-full px-3">
            <div className="flex justify-between">
              {/* 모든 유저가 좋아요 버튼을 볼 수 있음 */}
              <div id="likeBtn">
                <HeartCheckbox onChange={handleLikeChange} />
              </div>
              {/* 어드민/셀러 전용 체크박스 */}
              <div id="selectBtn">
                <input
                  id="select"
                  type="checkbox"
                  value=""
                  className="size-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="select" hidden>
                  chatSelect
                </label>
              </div>
            </div>
          </form>

          {/* 책 카드 */}
          <div
            className={`max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 ${isActive ? "ring-2 ring-green-500" : ""
              }`}
            onClick={handleClick}
          >
            <Link href={`/books/${book.id}`}>
              <Image
                width={400}
                height={380}
                className="rounded-t-lg"
                src={getBookImage(book.id)}
                alt={`cover of ${book.title}`}
                priority
              />
            </Link>
            <div className="p-5">
              <Link href={`/books/${book.id}`}>
                <h5
                  className={`mb-2 text-lg font-medium tracking-tight ${isActive ? "text-green-600" : "text-gray-900"
                    } dark:text-white`}
                >
                  {book.title}
                </h5>
              </Link>
              <p className="text-sm font-medium">저자: {book.author}</p>
              <p className="text-sm font-medium">출판사: {book.publisher}</p>
              <p className="text-sm font-medium">카테고리: {book.categoryName}</p>
              <Link
                href={`/books/${book.id}`}
                className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${isActive
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-400 hover:bg-green-500"
                  } dark:bg-green-400 dark:hover:bg-green-500`}
              >
                상세보기
                <svg
                  className="ms-2 size-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookRow;
