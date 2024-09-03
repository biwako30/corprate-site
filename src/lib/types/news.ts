
export interface NewsItem extends Document {
  newsId: string;
  title: string;
  content: string;
  date: Date;
  image: string;
}