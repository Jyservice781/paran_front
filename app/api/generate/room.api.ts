import { RoomModel, RoomUpdateModel, TimeModel } from "@/app/model/room/room.model";
import requests from "@/app/api/requests";
import api from "@/app/api/axios";

export const roomAPI = {
    insert(roomModel: RoomModel) { return api.post<RoomModel>(`${requests.fetchRooms}`, roomModel) },

    modify(roomModel: RoomUpdateModel) { return api.put<RoomModel>(`${requests.fetchRooms}`, roomModel) },

    drop(id: number) { return api.delete<boolean>(requests.fetchRooms + `/${id}`) },

    findByUser(nickname: string, page: number, size: number) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}` + `/user`, { params: { nickname, page, size } }) },

    findAll(page: number, size: number) { return api.get<Page<RoomModel>>(`${requests.fetchRooms}`, { params: { page, size } }) },

    findAllByEnabled() { return api.get<RoomModel[]>(requests.fetchRooms + '/enabled-all') },

    findByEnabled(page: number, size: number) { return api.get<Page<RoomModel>>(requests.fetchRooms + '/enabled', { params: { page, size } }) },

    modifyConfirm(id: number) { return api.put<RoomModel>(requests.fetchRooms + `/confirm/${id}`) },

    findTime(roomId: number) { return api.get<TimeModel[]>(requests.fetchRooms + `/times/${roomId}`) },

    findLikeRoomList: (nickname: string) => {
        return api.get<RoomModel[]>(requests.fetchRooms + `/like/${nickname}`);
    },
}