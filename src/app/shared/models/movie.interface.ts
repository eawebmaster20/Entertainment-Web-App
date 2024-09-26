export interface IMovie{
    id:string
    title: string,
    thumbnail: IThumbnail,
    year: 2019,
    category: string,
    rating: string,
    isBookmarked: boolean,
    isTrending: boolean,
  }

  export interface IThumbnail {
    trending: ITrending,
    regular: IRegular
  }

  export interface ITrending{
    small: string,
    large:string
  }
  
  export interface IRegular extends ITrending {
    medium: string
  }