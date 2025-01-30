import { useCallback } from 'react';

type DateValidationConfig = {
  disabledDates?: Date[]; // Fechas específicas deshabilitadas (ej. feriados)
  disableWeekends?: boolean; // Opción para deshabilitar sábados y domingos
  enabledRange?: { start: Date; end: Date }; // Rango de fechas habilitadas
};

export function useDateValidation(config: DateValidationConfig) {
  const { disabledDates = [], disableWeekends = false, enabledRange } = config;

  // Función para verificar si una fecha está habilitada
  const isDateEnabled = useCallback(
    (date: Date): boolean => {
      // Si la fecha está en la lista de deshabilitadas, retorna false
      if (disabledDates.some(disabled => disabled.toDateString() === date.toDateString())) {
        return false;
      }

      // Si disableWeekends es true, deshabilita sábados (6) y domingos (0)
      if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
        return false;
      }

      // Si hay un rango definido, solo permite fechas dentro del rango
      if (enabledRange) {
        if (date < enabledRange.start || date > enabledRange.end) {
          return false;
        }
      }

      return true;
    },
    [disabledDates, disableWeekends, enabledRange]
  );

  // Función para obtener fechas deshabilitadas dentro de un rango
  const getDisabledDatesInRange = useCallback(
    (startDate: Date, endDate: Date): Date[] => {
      const disabledInRange: Date[] = [];

      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        if (!isDateEnabled(currentDate)) {
          disabledInRange.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return disabledInRange;
    },
    [isDateEnabled]
  );

  return { isDateEnabled, getDisabledDatesInRange };
}
