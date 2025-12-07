export const calculateDday = (startDate: string): number => {
  const startDateObj = new Date(startDate)
  const today = new Date()
  const dday = Math.ceil((startDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return dday < 0 ? 0 : dday
}

export const formatDateTime = (dateTime: string): string => {
  return new Date(dateTime).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
