//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CarsInventoryMgmt.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class CarDetail
    {
        public long Car_Id { get; set; }
        public Nullable<int> User_Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public Nullable<int> Year { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<bool> New { get; set; }
    }
}
