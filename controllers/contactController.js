import asyncHandler from "express-async-handler";
import { contactModel as Contacts } from "../models/contactModel.js";

// @desc Get all contact
// @apply GET /api/contact
// @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contacts.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc post a contact
// @apply POST /api/contact
// @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contacts.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get a contact
// @apply GET /api/contact/:id
// @access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not Found a contact");
  }
  res.status(200).json(contact);
});

// @desc Update a contact
// @apply PUT /api/contact/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not Found a contact");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user contacts");
  }

  const updateContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updateContact);
});

// @desc Delete a contact
// @apply DELETE /api/contact/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Not Found a contact");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permission to update other user contacts");
  }

  const deleteContact = await Contacts.findByIdAndRemove(req.params.id);
  res.status(200).json(deleteContact);
});

export { getContacts, createContact, getContact, updateContact, deleteContact };
