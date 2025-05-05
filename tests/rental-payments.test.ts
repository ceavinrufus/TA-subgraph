import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BookingCancelled } from "../generated/schema"
import { BookingCancelled as BookingCancelledEvent } from "../generated/RentalPayments/RentalPayments"
import { handleBookingCancelled } from "../src/rental-payments"
import { createBookingCancelledEvent } from "./rental-payments-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let bookingId = BigInt.fromI32(234)
    let cancelledBy = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let renter = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let refundAmount = BigInt.fromI32(234)
    let newBookingCancelledEvent = createBookingCancelledEvent(
      bookingId,
      cancelledBy,
      renter,
      owner,
      refundAmount
    )
    handleBookingCancelled(newBookingCancelledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BookingCancelled created and stored", () => {
    assert.entityCount("BookingCancelled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BookingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bookingId",
      "234"
    )
    assert.fieldEquals(
      "BookingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cancelledBy",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BookingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "renter",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BookingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BookingCancelled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "refundAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
