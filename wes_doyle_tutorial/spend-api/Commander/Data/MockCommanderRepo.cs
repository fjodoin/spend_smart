/**
using System;
using System.Collections.Generic;
using System.Windows.Input;
using Commander.Models;

namespace Commander.Data
{
    public class MockCommanderRepo : ICommanderRepo
    {
        public IEnumerable<Command> GetAllCommands()
        {
            var commands = new List<Command>
            {
                new Command { Id = 0, HowTo = "Boil an Egg", Line = "Boil Water", Platform = "Pot and Pans" },
                new Command { Id = 1, HowTo = "Cut Bread", Line = "Use Knife", Platform = "Cutting Board" },
                new Command { Id = 2, HowTo = "Make Tea", Line = "Select Mug", Platform = "A Kettle" }
            };
            return commands;
        }

        public Command GetCommandById(int id)
        {
            return new Command { Id = 0, HowTo = "Boil an Egg", Line = "Boil Water", Platform = "Pot and Pans" };
        }
    }
}
**/