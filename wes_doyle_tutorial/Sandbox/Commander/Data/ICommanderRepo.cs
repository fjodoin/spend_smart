using System.Collections.Generic;
using Commander.Models;

namespace Commander.Data
{
    public interface ICommanderRepo
    {      
        void CreateCommand(Command cmd);
        void UpdateCommand(Command cmd);
        void DeleteCommand(Command cmd);
        IEnumerable<Command> GetAllCommands();
        Command GetCommandById(int id);
        bool SaveChanges();
    }
}