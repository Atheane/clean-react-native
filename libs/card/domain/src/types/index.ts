export type ILimits = {
  day?: number;
  week?: number;
  month?: number;
  year?: number;
};

export enum ICardStatuses {
  UNLOCK = 'UNLOCK', // The card is unlocked and can be used (if no other options or limit conflict)
  LOCK = 'LOCK', // The card is locked and cannot be used
  LOST = 'LOST', // The card is lost and cannot be used !!Permanent!!
  STOLEN = 'STOLEN', // The card is stolen and cannot be used - !!Permanent!!
  DESTROYED = 'DESTROYED', // The card is terminated and cannot be used - !!Permanent!!
}
