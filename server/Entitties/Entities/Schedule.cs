using Entitties.Notifies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entitties.Entities
{
    [Table("TB_SCHEDULE")]
    public class Schedule : Notify
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("TITLE")]
        [MaxLength(100)]
        public string Title { get; set; }

        [Column("DATE")]
        public DateTime ScheduleDate { get; set; }

        [Column("OBSERVATION")]
        [MaxLength(255)]
        public string? Observation { get; set; }
    }
}
