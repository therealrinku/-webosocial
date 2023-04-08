export interface PostModel {
  id: number;
  imageUrl?: string;
  postType: string;
  timestamp: string;
  text?: string;
  videoUrl?: string;
  username: string;
  profileImageUrl: string;
  likedBy?: string[];
  comments?: (null | {
    username: string;
    profileImage: string;
    comment: string;
    timestamp: string;
  })[];
}
