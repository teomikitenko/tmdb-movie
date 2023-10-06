export const validMonth = (date) => {
    return date.toString().length > 1 ? date : 0 + date.toString();
  };
 export const takeMinusDate=(days)=>{
      const currentDate=new Date()
      const sevenDays=currentDate.setDate(currentDate.getDate() - days );
     return `${new Date(sevenDays).getFullYear()}-${validMonth(
      new Date(sevenDays).getMonth() + 1
    )}-${validMonth(new Date(sevenDays).getDate())}`; 
    }
   export const nowDate = () => {
      return `${new Date().getFullYear()}-${validMonth(
        new Date().getMonth() + 1
      )}-${validMonth(new Date().getDate())}`;
    }; 
    export const takePlusDays = (days) => {
        const currentDate = new Date();
        const sevenDays = currentDate.setDate(currentDate.getDate() + days);
        return `${new Date(sevenDays).getFullYear()}-${validMonth(
          new Date(sevenDays).getMonth() + 1
        )}-${validMonth(new Date(sevenDays).getDate())}`;
      };