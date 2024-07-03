export interface courseAddDTO{
  title:string;
  category:string;
  description:string;
  language:string;
  thumbnail:string;
  trailer:string;
  instructor:string;
  lessons:[];
  isPublished:boolean;
  isRejected:boolean;
  isRequested:boolean;
}
