import { Severity, TimeBomb } from './models';

const SECOND = 1000;
const TWO_WEEKS_IN_DAYS = 14;
const BOMB_EMOJI = '💣';

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function isProdMode(): boolean {
  return process?.env?.NODE_ENV === 'production';
}

function isTestMode(): boolean {
  return process?.env?.NODE_ENV === 'test';
}

function isDevMode(): boolean {
  return process?.env?.NODE_ENV === 'development';
}

function addDays(date: Date, number: number): Date {
  const newDate = new Date(date);

  return new Date(newDate.setDate(newDate.getDate() + number));
}

function getDueDateMessage(bomb: TimeBomb): string {
  return `\u001b[1;31m [*Time Bomb*] - (${bomb.functionName}) bomb of ${bomb.owner} has passed it's due date [${formatDate(
    bomb.dueDate
  )}]`;
}

function getBeforeDueDateMessage(bomb: TimeBomb): string {
  return `\u001b[1;36m [*Time Bomb*] - (${bomb.functionName}) bomb of ${
    bomb.owner
  } has almost passed it's due date [${formatDate(bomb.dueDate)}]`;
}

function throwErrorIfDueDatePassed(bomb: TimeBomb): void {
  const dateNow = new Date();
  if (dateNow <= bomb.dueDate) {
    return;
  }
  if (bomb.severity === Severity.ERROR) {
    throw new Error(getDueDateMessage(bomb));
  } else {
    console.warn(getDueDateMessage(bomb));
  }
}

function writeToConsoleIfThereAreLessThanTwoWeeksForTheBomb(bomb: TimeBomb): void {
  const dateNow = new Date();

  if (dateNow > bomb.dueDate) {
    const message = getDueDateMessage(bomb);

    setTimeout(() => console.error('%s' + message, BOMB_EMOJI), 2 * SECOND);
    setInterval(() => console.error('%s' + message, BOMB_EMOJI), 20 * SECOND);

    return;
  }

  const twoWeeksBeforeDueDate = addDays(bomb.dueDate, -TWO_WEEKS_IN_DAYS);

  if (dateNow > twoWeeksBeforeDueDate) {
    const alertMessage = getBeforeDueDateMessage(bomb);

    setTimeout(() => console.error(alertMessage), 2 * SECOND);
    setInterval(() => console.error(alertMessage), 60 * SECOND);
  }
}

function validUntil(bomb: TimeBomb): void {
  if (isTestMode()) {
    throwErrorIfDueDatePassed(bomb);
  }
  if (isDevMode()) {
    writeToConsoleIfThereAreLessThanTwoWeeksForTheBomb(bomb);
  }
}

//date string - "2022-03-25" - YYYY-MM-DD
export const TimeBomb = (dueDateStr: string, owner: string, severity = Severity.WARNING): MethodDecorator => {
  return (_target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    if (typeof propertyKey !== 'string') {
      throw new Error('property key needs to be a string');
    }
    if (isProdMode()) {
      return;
    }

    const dueDate = new Date(dueDateStr);
    const bomb = { dueDate, owner, functionName: propertyKey, severity };

    validUntil(bomb);

    return descriptor;
  };
};
