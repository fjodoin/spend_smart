using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SpendApi.Data;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Newtonsoft.Json.Serialization;
using Microsoft.OpenApi.Models;
using System.Reflection;

namespace SpendApi
{
    public class Startup
    {

        private string _connectionString = null;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy",
                    c => c.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });

            _connectionString = Configuration["secretConnectionString"];

            services.AddDbContext<ExpenseContext>(opt => opt.UseSqlServer(_connectionString));
            services.AddDbContext<IncomeContext>(opt => opt.UseSqlServer(_connectionString));
            services.AddDbContext<BillContext>(opt => opt.UseSqlServer(_connectionString));
            services.AddDbContext<GoalContext>(opt => opt.UseSqlServer(_connectionString));
           
            services.AddControllers().AddNewtonsoftJson(s => {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();    
            });

            services.AddScoped<IExpenseRepo, SqlExpenseRepo>();
            services.AddScoped<IIncomeRepo, SqlIncomeRepo>();
            services.AddScoped<IBillRepo, SqlBillRepo>();
            services.AddScoped<IGoalRepo, SqlGoalRepo>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SpendApi", Version = "v1" });
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddMvc();

            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors("CorsPolicy");
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpendApi v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
