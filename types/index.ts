export interface CommentModel {
  id: number,
  username: string;
  email: string;
  profileImageUrl: string;
  comment: string;
  timestamp: string;
}

export interface PostModel {
  id: number;
  imageUrl?: string;
  postType: string;
  timestamp: string;
  text?: string;
  videoUrl?: string;
  email:string;
  username: string;
  profileImageUrl: string;
  likedBy?: string[];
  comments?: CommentModel[];
}
