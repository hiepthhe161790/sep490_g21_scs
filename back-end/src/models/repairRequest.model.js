const mongoose = require('mongoose');
const { Schema } = mongoose;

const repairRequestSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User' },
  assignedTechnicianId: { type: Schema.Types.ObjectId, ref: 'User' },
  incidentInfor: {   
    issue: { type: String, default: '' }, 
    // images: [{ filename: String, path: String }], 
    // video: [{ filename: String, path: String }] 
  },
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    groupCustomerId: { type: Schema.Types.ObjectId, ref: 'GroupCustomer' },
  },
  otherInfo: {
    note: { type: String, default: '' },
    // invoiceImages: { filename: String, path: String },
  },
  generalInfo: {
    repairLocation: String,
    estimatedCompletionDate: Date, 
    accessoriesIncluded: [String], 
  },
  repairStatus: { 
    type: String, 
    enum: ['PENDING','CHECKING','CONFIRMED', 'FIXING', 'FIXED', 'FAILED'], 
    default: 'PENDING' 
  }, 
  products: [{ 
    productId: { type: Schema.Types.ObjectId, ref: 'Product' }, 
    warrantyId: { type: Schema.Types.ObjectId, ref: 'Warranty', default: null },
    serialNumber: String, 
    requestType: { type: String, enum: ['REPAIR', 'WARRANTY'], default: 'REPAIR'},
  }],
  repairRecords: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'RepairRecord' 
  }],
  pay: { 
    serviceFee : { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    payInWords: String,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('RepairRequest', repairRequestSchema);