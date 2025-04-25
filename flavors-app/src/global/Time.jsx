export function parseTimestampToTime(timestamp) {
  if (!timestamp) return null;
  try {
    if (timestamp.length == 5) return timestamp

    const date = new Date(timestamp);

    // Извлекаем часы и минуты
    const hours = String(date.getHours()).padStart(2, "0"); // Добавляем ноль слева, если число меньше 10
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`; // Возвращаем формат "HH:mm"
  } catch (error) {
    console.error("Ошибка при парсинге времени:", error);
    return null;
  }
}

export function parseTimestampToDate(timestamp) {
  if (!timestamp) return null; // Проверяем, что timestamp не пустой
  // if (typestamp.length < 6) return timestamp
  try {
    if (timestamp.length == 5) return timestamp
    // Создаем объект Date из строки ISO 8601
    const date = new Date(timestamp);

    // Форматируем дату в "YYYY-MM-DD"
    const year = date.getFullYear(); // Год
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц (с нулём слева, если меньше 10)
    const day = String(date.getDate()).padStart(2, "0"); // День (с нулём слева, если меньше 10)

    return `${year}-${month}-${day}`; // Возвращаем формат "YYYY-MM-DD"
  } catch (error) {
    console.error("Ошибка при парсинге даты:", error);
    return null; // Возвращаем null, если произошла ошибка
  }
}
export function getTodayDateFormatted() {
  const today = new Date(); // Создаем объект с текущей датой <button class="citation-flag" data-index="5">

  // Извлекаем компоненты даты
  const year = today.getFullYear(); // Получаем год
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Получаем месяц (нумерация начинается с 0, поэтому добавляем 1) и дополняем ноль слева если нужно
  const day = String(today.getDate()).padStart(2, '0'); // Получаем день месяца и дополняем ноль слева если нужно

  // Возвращаем строку в формате YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
export function formatDateToDayMonth(dateString) {
  // Проверяем, что строка даты не пустая
  if (!dateString) return "";

  try {
    // Создаем объект Date из входной строки
    const date = new Date(dateString);

    // Получаем день и месяц
    const day = date.getDate(); // День месяца (1-31)
    const monthNames = [
      "января", "февраля", "марта", "апреля",
      "мая", "июня", "июля", "августа",
      "сентября", "октября", "ноября", "декабря"
    ]; // Массив с названиями месяцев
    const monthName = monthNames[date.getMonth()]; // Получаем название месяца

    // Возвращаем строку в формате "DD Month"
    return `${day} ${monthName}`;
  } catch (error) {
    console.error("Ошибка при форматировании даты:", error);
    return ""; // Возвращаем пустую строку в случае ошибки
  }
}