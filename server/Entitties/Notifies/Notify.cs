using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Threading.Tasks;

namespace Entitties.Notifies
{
    public class Notify
    {

        public Notify() { 
            Notifies = new List<Notify>();
        }

        [NotMapped]
        public string PropertyName { get; set; }

        [NotMapped]
        public string Mensage { get; set; }

        [NotMapped]
        public List<Notify> Notifies { get; set; }

        public bool ValidatePropertyString(string value, string propertyName)
        {
            if(string.IsNullOrWhiteSpace(value) || string.IsNullOrWhiteSpace(propertyName))
            {
                Notifies.Add(new Notify
                {
                    Mensage = "Campo Obrigatório",
                    PropertyName = propertyName,
                });

                return false;
            };

            return true;
        }
    }
}
