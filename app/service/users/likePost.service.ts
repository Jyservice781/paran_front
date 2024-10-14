import { AppDispatch } from "@/lib/store";
import { addLikedPost, deleteLikedPost, saveLikedPosts } from "@/lib/features/users/users.slice";
import { saveError, saveLoading } from "@/lib/features/users/user.slice";
import { LikePostModel } from "@/app/model/user/users.model";
import { likePostAPI } from "@/app/api/generate/likePost.api";

// 좋아요
const insert = async (likePostModel: LikePostModel, dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likePostAPI.insert(likePostModel)
        if ('id' in response.data && 'nickname' in response.data) {
            dispatch(addLikedPost(response.data))
        }
    } catch (error) {
        dispatch(saveError("좋아요 중 오류 발생했습니다."));
        console.error('Error adding likePost:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 취소
const drop = async (likePostModel: LikePostModel, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likePostAPI.drop(likePostModel)
        if (likePostModel.id !== undefined) {
            dispatch(deleteLikedPost(likePostModel.id));
        }
    } catch (error) {
        dispatch(saveError("좋아요 취소 중 오류 발생했습니다."));
        console.error('Error adding likePost:', error);
    } finally {
        dispatch(saveLoading(false));
    }
};

// 좋아요 마이페이지 확인
const findAllByUserNickname = async (nickname: string, dispatch: AppDispatch): Promise<void> => {
    try {
        dispatch(saveLoading(true));
        const response = await likePostAPI.findLikePostList(nickname)
        dispatch(saveLikedPosts(response.data))
    } catch (error) {
        dispatch(saveError("좋아요 한 게시물을 찾는 중 오류 발생했습니다."));
        console.error('Error finding likePost:', error);
    } finally {
        dispatch(saveLoading(false));
    }
}
export const likePostService = {
    insert,
    drop,
    findAllByUserNickname
};
