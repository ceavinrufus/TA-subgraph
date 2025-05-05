import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  BookingCancelled as BookingCancelledEvent,
  DisputePeriodUpdated as DisputePeriodUpdatedEvent,
  DisputeRaised as DisputeRaisedEvent,
  DisputeRaisedByGuest as DisputeRaisedByGuestEvent,
  DisputeRaisedByHost as DisputeRaisedByHostEvent,
  DisputeResolved as DisputeResolvedEvent,
  FeeStructureUpdated as FeeStructureUpdatedEvent,
  GuestDepositClaimed as GuestDepositClaimedEvent,
  GuestDepositRefunded as GuestDepositRefundedEvent,
  GuestDisputeLost as GuestDisputeLostEvent,
  GuestDisputeWon as GuestDisputeWonEvent,
  HostDisputeLost as HostDisputeLostEvent,
  HostDisputeWon as HostDisputeWonEvent,
  PaymentInitiated as PaymentInitiatedEvent,
  PaymentReleased as PaymentReleasedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from "../generated/RentalPayments/RentalPayments";
import {
  HostReputation,
  BookingCancelled,
  DisputePeriodUpdated,
  DisputeRaised,
  DisputeRaisedByGuest,
  DisputeRaisedByHost,
  DisputeResolved,
  FeeStructureUpdated,
  GuestDepositClaimed,
  GuestDepositRefunded,
  GuestDisputeLost,
  GuestDisputeWon,
  HostDisputeLost,
  HostDisputeWon,
  PaymentInitiated,
  PaymentReleased,
  RoleGranted,
  RoleRevoked,
} from "../generated/schema";

function updateHostReputation(
  host: Bytes,
  isRaised: boolean, // True for raising a dispute, false for resolving
  timestamp: BigInt,
  won: boolean = false // Only relevant when resolving a dispute
): void {
  let reputation = HostReputation.load(host);
  if (!reputation) {
    reputation = new HostReputation(host);
    reputation.totalDisputes = BigInt.fromI32(0);
    reputation.disputesWon = BigInt.fromI32(0);
    reputation.disputesLost = BigInt.fromI32(0);
    reputation.reputationScore = BigInt.fromI32(0);
    reputation.lastRaiseDisputeTimestamp = BigInt.fromI32(0);
    reputation.lastResolveDisputeTimestamp = BigInt.fromI32(0);
    reputation.disputesRaised = BigInt.fromI32(0);
  }

  if (isRaised) {
    // Handle dispute raised
    reputation.disputesRaised = reputation.disputesRaised.plus(
      BigInt.fromI32(1)
    );
    reputation.lastRaiseDisputeTimestamp = timestamp;
  } else {
    // Handle dispute resolved
    reputation.totalDisputes = reputation.totalDisputes.plus(BigInt.fromI32(1));
    if (won) {
      reputation.disputesWon = reputation.disputesWon.plus(BigInt.fromI32(1));
    } else {
      reputation.disputesLost = reputation.disputesLost.plus(BigInt.fromI32(1));
    }

    reputation.lastResolveDisputeTimestamp = timestamp;

    // Example reputation score calculation
    reputation.reputationScore = reputation.disputesWon.minus(
      reputation.disputesLost
    );
  }

  reputation.save();
}

export function handleBookingCancelled(event: BookingCancelledEvent): void {
  let entity = new BookingCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.cancelledBy = event.params.cancelledBy;
  entity.renter = event.params.renter;
  entity.owner = event.params.owner;
  entity.refundAmount = event.params.refundAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputePeriodUpdated(
  event: DisputePeriodUpdatedEvent
): void {
  let entity = new DisputePeriodUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newDisputePeriod = event.params.newDisputePeriod;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputeRaised(event: DisputeRaisedEvent): void {
  let entity = new DisputeRaised(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputeRaisedByGuest(
  event: DisputeRaisedByGuestEvent
): void {
  let entity = new DisputeRaisedByGuest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.guest = event.params.guest;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDisputeRaisedByHost(
  event: DisputeRaisedByHostEvent
): void {
  let entity = new DisputeRaisedByHost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.host = event.params.host;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update host reputation for raising a dispute
  updateHostReputation(event.params.host, true, event.block.timestamp);
}

export function handleDisputeResolved(event: DisputeResolvedEvent): void {
  let entity = new DisputeResolved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.favorRenter = event.params.favorRenter;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleFeeStructureUpdated(
  event: FeeStructureUpdatedEvent
): void {
  let entity = new FeeStructureUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.commission = event.params.commission;
  entity.deposit = event.params.deposit;
  entity.hostPayment = event.params.hostPayment;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGuestDepositClaimed(
  event: GuestDepositClaimedEvent
): void {
  let entity = new GuestDepositClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.owner = event.params.owner;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGuestDepositRefunded(
  event: GuestDepositRefundedEvent
): void {
  let entity = new GuestDepositRefunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.renter = event.params.renter;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGuestDisputeLost(event: GuestDisputeLostEvent): void {
  let entity = new GuestDisputeLost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.guest = event.params.guest;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleGuestDisputeWon(event: GuestDisputeWonEvent): void {
  let entity = new GuestDisputeWon(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.guest = event.params.guest;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleHostDisputeLost(event: HostDisputeLostEvent): void {
  let entity = new HostDisputeLost(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.host = event.params.host;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update host reputation for resolving a dispute (lost)
  updateHostReputation(event.params.host, false, event.block.timestamp, false);
}

export function handleHostDisputeWon(event: HostDisputeWonEvent): void {
  let entity = new HostDisputeWon(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.host = event.params.host;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // Update host reputation for resolving a dispute (won)
  updateHostReputation(event.params.host, false, event.block.timestamp, true);
}

export function handlePaymentInitiated(event: PaymentInitiatedEvent): void {
  let entity = new PaymentInitiated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.renter = event.params.renter;
  entity.owner = event.params.owner;
  entity.amount = event.params.amount;
  entity.guestDeposit = event.params.guestDeposit;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePaymentReleased(event: PaymentReleasedEvent): void {
  let entity = new PaymentReleased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.bookingId = event.params.bookingId;
  entity.owner = event.params.owner;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.role = event.params.role;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.account = event.params.account;
  entity.role = event.params.role;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
