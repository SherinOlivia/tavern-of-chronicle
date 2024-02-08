export const errorHandling = function (data: any, error: Error) {
    if (error) {
        return {
            sucess:false,
            error: error
        }
    } else {
        return {
            success: true,
            data:data
        }
    }
}