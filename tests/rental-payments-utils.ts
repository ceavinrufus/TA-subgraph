import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
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
  RoleRevoked
} from "../generated/RentalPayments/RentalPayments"

export function createBookingCancelledEvent(
  bookingId: BigInt,
  cancelledBy: Address,
  renter: Address,
  owner: Address,
  refundAmount: BigInt
): BookingCancelled {
  let bookingCancelledEvent = changetype<BookingCancelled>(newMockEvent())

  bookingCancelledEvent.parameters = new Array()

  bookingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  bookingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "cancelledBy",
      ethereum.Value.fromAddress(cancelledBy)
    )
  )
  bookingCancelledEvent.parameters.push(
    new ethereum.EventParam("renter", ethereum.Value.fromAddress(renter))
  )
  bookingCancelledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  bookingCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "refundAmount",
      ethereum.Value.fromUnsignedBigInt(refundAmount)
    )
  )

  return bookingCancelledEvent
}

export function createDisputePeriodUpdatedEvent(
  newDisputePeriod: BigInt
): DisputePeriodUpdated {
  let disputePeriodUpdatedEvent =
    changetype<DisputePeriodUpdated>(newMockEvent())

  disputePeriodUpdatedEvent.parameters = new Array()

  disputePeriodUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newDisputePeriod",
      ethereum.Value.fromUnsignedBigInt(newDisputePeriod)
    )
  )

  return disputePeriodUpdatedEvent
}

export function createDisputeRaisedEvent(bookingId: BigInt): DisputeRaised {
  let disputeRaisedEvent = changetype<DisputeRaised>(newMockEvent())

  disputeRaisedEvent.parameters = new Array()

  disputeRaisedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )

  return disputeRaisedEvent
}

export function createDisputeRaisedByGuestEvent(
  bookingId: BigInt,
  guest: Address
): DisputeRaisedByGuest {
  let disputeRaisedByGuestEvent =
    changetype<DisputeRaisedByGuest>(newMockEvent())

  disputeRaisedByGuestEvent.parameters = new Array()

  disputeRaisedByGuestEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  disputeRaisedByGuestEvent.parameters.push(
    new ethereum.EventParam("guest", ethereum.Value.fromAddress(guest))
  )

  return disputeRaisedByGuestEvent
}

export function createDisputeRaisedByHostEvent(
  bookingId: BigInt,
  host: Address
): DisputeRaisedByHost {
  let disputeRaisedByHostEvent = changetype<DisputeRaisedByHost>(newMockEvent())

  disputeRaisedByHostEvent.parameters = new Array()

  disputeRaisedByHostEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  disputeRaisedByHostEvent.parameters.push(
    new ethereum.EventParam("host", ethereum.Value.fromAddress(host))
  )

  return disputeRaisedByHostEvent
}

export function createDisputeResolvedEvent(
  bookingId: BigInt,
  favorRenter: boolean
): DisputeResolved {
  let disputeResolvedEvent = changetype<DisputeResolved>(newMockEvent())

  disputeResolvedEvent.parameters = new Array()

  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  disputeResolvedEvent.parameters.push(
    new ethereum.EventParam(
      "favorRenter",
      ethereum.Value.fromBoolean(favorRenter)
    )
  )

  return disputeResolvedEvent
}

export function createFeeStructureUpdatedEvent(
  commission: BigInt,
  deposit: BigInt,
  hostPayment: BigInt
): FeeStructureUpdated {
  let feeStructureUpdatedEvent = changetype<FeeStructureUpdated>(newMockEvent())

  feeStructureUpdatedEvent.parameters = new Array()

  feeStructureUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "commission",
      ethereum.Value.fromUnsignedBigInt(commission)
    )
  )
  feeStructureUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  feeStructureUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "hostPayment",
      ethereum.Value.fromUnsignedBigInt(hostPayment)
    )
  )

  return feeStructureUpdatedEvent
}

export function createGuestDepositClaimedEvent(
  bookingId: BigInt,
  owner: Address,
  amount: BigInt
): GuestDepositClaimed {
  let guestDepositClaimedEvent = changetype<GuestDepositClaimed>(newMockEvent())

  guestDepositClaimedEvent.parameters = new Array()

  guestDepositClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  guestDepositClaimedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  guestDepositClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return guestDepositClaimedEvent
}

export function createGuestDepositRefundedEvent(
  bookingId: BigInt,
  renter: Address,
  amount: BigInt
): GuestDepositRefunded {
  let guestDepositRefundedEvent =
    changetype<GuestDepositRefunded>(newMockEvent())

  guestDepositRefundedEvent.parameters = new Array()

  guestDepositRefundedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  guestDepositRefundedEvent.parameters.push(
    new ethereum.EventParam("renter", ethereum.Value.fromAddress(renter))
  )
  guestDepositRefundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return guestDepositRefundedEvent
}

export function createGuestDisputeLostEvent(
  bookingId: BigInt,
  guest: Address
): GuestDisputeLost {
  let guestDisputeLostEvent = changetype<GuestDisputeLost>(newMockEvent())

  guestDisputeLostEvent.parameters = new Array()

  guestDisputeLostEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  guestDisputeLostEvent.parameters.push(
    new ethereum.EventParam("guest", ethereum.Value.fromAddress(guest))
  )

  return guestDisputeLostEvent
}

export function createGuestDisputeWonEvent(
  bookingId: BigInt,
  guest: Address
): GuestDisputeWon {
  let guestDisputeWonEvent = changetype<GuestDisputeWon>(newMockEvent())

  guestDisputeWonEvent.parameters = new Array()

  guestDisputeWonEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  guestDisputeWonEvent.parameters.push(
    new ethereum.EventParam("guest", ethereum.Value.fromAddress(guest))
  )

  return guestDisputeWonEvent
}

export function createHostDisputeLostEvent(
  bookingId: BigInt,
  host: Address
): HostDisputeLost {
  let hostDisputeLostEvent = changetype<HostDisputeLost>(newMockEvent())

  hostDisputeLostEvent.parameters = new Array()

  hostDisputeLostEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  hostDisputeLostEvent.parameters.push(
    new ethereum.EventParam("host", ethereum.Value.fromAddress(host))
  )

  return hostDisputeLostEvent
}

export function createHostDisputeWonEvent(
  bookingId: BigInt,
  host: Address
): HostDisputeWon {
  let hostDisputeWonEvent = changetype<HostDisputeWon>(newMockEvent())

  hostDisputeWonEvent.parameters = new Array()

  hostDisputeWonEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  hostDisputeWonEvent.parameters.push(
    new ethereum.EventParam("host", ethereum.Value.fromAddress(host))
  )

  return hostDisputeWonEvent
}

export function createPaymentInitiatedEvent(
  bookingId: BigInt,
  renter: Address,
  owner: Address,
  amount: BigInt,
  guestDeposit: BigInt
): PaymentInitiated {
  let paymentInitiatedEvent = changetype<PaymentInitiated>(newMockEvent())

  paymentInitiatedEvent.parameters = new Array()

  paymentInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  paymentInitiatedEvent.parameters.push(
    new ethereum.EventParam("renter", ethereum.Value.fromAddress(renter))
  )
  paymentInitiatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  paymentInitiatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  paymentInitiatedEvent.parameters.push(
    new ethereum.EventParam(
      "guestDeposit",
      ethereum.Value.fromUnsignedBigInt(guestDeposit)
    )
  )

  return paymentInitiatedEvent
}

export function createPaymentReleasedEvent(
  bookingId: BigInt,
  owner: Address,
  amount: BigInt
): PaymentReleased {
  let paymentReleasedEvent = changetype<PaymentReleased>(newMockEvent())

  paymentReleasedEvent.parameters = new Array()

  paymentReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "bookingId",
      ethereum.Value.fromUnsignedBigInt(bookingId)
    )
  )
  paymentReleasedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  paymentReleasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return paymentReleasedEvent
}

export function createRoleGrantedEvent(
  account: Address,
  role: string
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  account: Address,
  role: string
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromString(role))
  )

  return roleRevokedEvent
}
